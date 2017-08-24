from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.middleware.csrf import get_token
from django.contrib.auth.decorators import login_required
from .models import Post, Comment
from .forms import PostForm, CommentForm

def post_list(request):
  posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')
  return render(request, 'weblog/post_list.html', {'posts': posts})

def post_detail(request, pk):
  post = get_object_or_404(Post, pk=pk)
  auth = {'isAuthenticated': request.user.is_authenticated() and 'true' or 'false'}
  attributes = post.attributes().copy()
  attributes.update(auth)
  return render(request, 'weblog/post_detail.html', {'post': attributes})

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
    post = {
      'csrf_token': get_token(request)
    }
    # form = PostForm()
  return render(request, 'weblog/post_edit.html', {'post': post})

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
    post = {
      'title': post.title,
      'text': post.text,
      'csrf_token': get_token(request)
    }
  return render(request, 'weblog/post_edit.html', {'post': post})

@login_required
def post_draft_list(request):
  posts = Post.objects.filter(published_date__isnull=True).order_by('-created_date')
  return render(request, 'weblog/post_draft_list.html', {'posts': posts})

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
  else:
    form = CommentForm()
  return render(request, 'weblog/add_comment_to_post.html', {'form': form})

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
