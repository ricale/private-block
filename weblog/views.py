from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.middleware.csrf import get_token
from django.contrib.auth.decorators import login_required
from .models import Post, Category, Comment
from .forms import PostForm, CommentForm

def get_dictionary_from_list(targetList, key_name):
  dictionary = {}
  for x in targetList:
    dictionary[x[key_name]] = x

  return dictionary

def post_list(request):
  posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')
  categories = Category.objects.all()
  attrs = {
    'posts': list(map(lambda c: c.attributes_without_text(), posts)),
    'categories': get_dictionary_from_list(list(map(lambda c: c.attributes(), categories)), 'pk')
  }
  return render(request, 'weblog/post_list.html', {'attrs': attrs})

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
    categories = Category.objects.all()
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
    categories = Category.objects.all()
    attrs = {
      'post': post.attributes(),
      'csrfToken': get_token(request),
      'categories': list(map(lambda c: c.attributes(), categories))
    }
  return render(request, 'weblog/post_edit.html', {'attrs': attrs})

@login_required
def post_draft_list(request):
  posts = Post.objects.filter(published_date__isnull=True).order_by('-created_date')
  categories = Category.objects.all()
  attrs = {
    'posts': list(map(lambda c: c.attributes_without_text(), posts)),
    'categories': get_dictionary_from_list(list(map(lambda c: c.attributes(), categories)), 'pk')
  }
  return render(request, 'weblog/post_draft_list.html', {'attrs': attrs})

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
