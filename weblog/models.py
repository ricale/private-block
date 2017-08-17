from django.db import models
from django.utils import timezone

class Post(models.Model):
  author         = models.ForeignKey('auth.User')
  title          = models.CharField(max_length=200)
  text           = models.TextField()
  created_date   = models.DateTimeField(default=timezone.now)
  updated_date   = models.DateTimeField(default=timezone.now)
  published_date = models.DateTimeField(blank=True, null=True)
  category       = models.ForeignKey('weblog.Category', default=1)

  def publish(self):
    self.published_date = timezone.now()
    self.save()

  def approved_comments(self):
    return self.comments.filter(approved_comment=True)

  def __str__(self):
    return self.title

class Comment(models.Model):
  post = models.ForeignKey('weblog.Post', related_name='comments')
  author = models.CharField(max_length=200)
  text = models.TextField()
  created_date = models.DateTimeField(default=timezone.now)
  approved_comment = models.BooleanField(default=False)

  def approve(self):
    self.approved_comment = True
    self.save()

  def __str__(self):
    return self.text

class Category(models.Model):
  name         = models.CharField(max_length=100)
  created_date = models.DateTimeField(default=timezone.now)
  updated_date = models.DateTimeField(default=timezone.now)
  # parent_id
  # depth
  # order_in_parent
  # family