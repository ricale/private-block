from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.middleware.csrf import get_token
from django.contrib.auth.decorators import login_required
from .models import Post, Category, Comment
from .forms import PostForm, CommentForm

PER_PAGE = 10


def get_attrs_for_post_list(posts, page, options={}):
  first = (int(page) - 1) * PER_PAGE;
  last  = int(page) * PER_PAGE;

  post_count = posts.count()
  posts = posts[first:last]
  categories = Category.objects.order_by('family', 'depth', 'order_in_parent')

  return {
    'posts': list(map(lambda c: c.attributes_without_text(), posts)),
    'categories': list(map(lambda c: c.attributes(), categories)),
    'postCount': post_count,
    'perPage': PER_PAGE,
    'page': page
  }


def post_list(request, page=1):
  attrs = get_attrs_for_post_list(
    Post.objects.filter(published_date__lte=timezone.now()).order_by('-published_date'),
    page
  )
  return render(request, 'weblog/post_list.html', {'attrs': attrs})

@login_required
def post_draft_list(request, page=1):
  attrs = get_attrs_for_post_list(
    Post.objects.filter(published_date__isnull=True).order_by('-created_date'),
    page
  )
  return render(request, 'weblog/post_draft_list.html', {'attrs': attrs})

def category_post(request, pk, page=1):
  category = Category.objects.get(pk=pk)

  if category.parent_id is None:
    posts = Post.objects.all()
  else:
    children_categories = Category.objects.filter(parent_id=pk)
    pks = list(map(lambda c: c.pk, children_categories))
    pks.append(pk)
    posts = Post.objects.filter(category_id__in=pks)

  attrs = get_attrs_for_post_list(
    posts.filter(published_date__lte=timezone.now()).order_by('-published_date'),
    page
  )

  return render(request, 'weblog/category_post.html', {'attrs': attrs})

def category_post_draft(request, pk, page=1):
  category = Category.objects.get(pk=pk)

  if category.parent_id is None:
    posts = Post.objects.all()
  else:
    children_categories = Category.objects.filter(parent_id=pk)
    pks = list(map(lambda c: c.pk, children_categories))
    pks.append(pk)
    posts = Post.objects.filter(category_id__in=pks)

  attrs = get_attrs_for_post_list(
    posts.filter(published_date__isnull=True).order_by('-created_date'),
    page
  )
  return render(request, 'weblog/category_post_draft.html', {'attrs': attrs})











def post_detail(request, pk):
  post = get_object_or_404(Post, pk=pk)
  attrs = {
    'isAuthenticated': request.user.is_authenticated() and 'true' or 'false',
    'csrfToken': get_token(request),
    'post': post.attributes(),
    'category': Category.objects.get(pk=post.category_id).attributes()
  }
  return render(request, 'weblog/post_detail.html', {'attrs': attrs})

@login_required
def post_new(request):
  if request.method == "POST":
    form = PostForm(request.POST)
    if form.is_valid():
      post = form.save(commit=False)
      post.author = request.user
      post.save()
      return redirect('post_detail', pk=post.pk)
  else:
    categories = Category.objects.order_by('family', 'depth', 'order_in_parent')
    attrs = {
      'post': {},
      'csrfToken': get_token(request),
      'categories': list(map(lambda c: c.attributes(), categories))
    }

  return render(request, 'weblog/post_edit.html', {'attrs': attrs})

@login_required
def post_edit(request, pk):
  post = get_object_or_404(Post, pk=pk)
  if request.method == "POST":
    form = PostForm(request.POST, instance=post)
    if form.is_valid():
      post = form.save(commit=False)
      post.author = request.user
      post.updated_date = timezone.now()
      post.save()
      return redirect('post_detail', pk=post.pk)
  else:
    categories = Category.objects.order_by('family', 'depth', 'order_in_parent')
    attrs = {
      'post': post.attributes(),
      'csrfToken': get_token(request),
      'categories': list(map(lambda c: c.attributes(), categories))
    }
  return render(request, 'weblog/post_edit.html', {'attrs': attrs})

@login_required
def post_publish(request, pk):
  post = get_object_or_404(Post, pk=pk)
  post.publish()
  return redirect('post_detail', pk=pk)

@login_required
def post_remove(request, pk):
  post = get_object_or_404(Post, pk=pk)
  post.delete()
  return redirect('post_list')

def add_comment_to_post(request, pk):
  post = get_object_or_404(Post, pk=pk)
  if request.method == "POST":
    form = CommentForm(request.POST)
    if form.is_valid():
      comment = form.save(commit=False)
      comment.post = post
      comment.save()
      return redirect('post_detail', pk=post.pk)

@login_required
def comment_approve(request, pk):
  comment = get_object_or_404(Comment, pk=pk)
  comment.approve()
  return redirect('post_detail', pk=comment.post.pk)

@login_required
def comment_remove(request, pk):
  comment = get_object_or_404(Comment, pk=pk)
  comment.delete()
  return redirect('post_detail', pk=comment.post.pk)


def category_list(request):
  categories = Category.objects.order_by('family', 'depth', 'order_in_parent')
  attrs = {
    'categories': list(map(lambda c: c.attributes(), categories))
  }
  return render(request, 'weblog/category_list.html', {'attrs': attrs})
