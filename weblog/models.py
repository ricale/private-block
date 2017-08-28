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

  def attributes(self):
    return {
      'pk':             self.pk,
      'title':          self.title,
      'category_id':    self.category_id,
      'text':           self.text,
      'created_date':   self.created_date and self.created_date.isoformat(),
      'updated_date':   self.updated_date and self.updated_date.isoformat(),
      'published_date': self.published_date and self.published_date.isoformat() or '',

      'comments': list(map(lambda c: c.attributes(), self.comments.all()))
    }

  def attributes_without_text(self):
    return {
      'pk':             self.pk,
      'title':          self.title,
      'category_id':    self.category_id,
      'created_date':   self.created_date and self.created_date.isoformat(),
      'updated_date':   self.updated_date and self.updated_date.isoformat(),
      'published_date': self.published_date and self.published_date.isoformat() or '',

      'comments': list(map(lambda c: c.attributes(), self.comments.all()))
    }

  def __str__(self):
    return self.title

class Comment(models.Model):
  post             = models.ForeignKey('weblog.Post', related_name='comments')
  author           = models.CharField(max_length=200)
  text             = models.TextField()
  created_date     = models.DateTimeField(default=timezone.now)
  approved_comment = models.BooleanField(default=False)

  def approve(self):
    self.approved_comment = True
    self.save()

  def attributes(self):
    return {
      'pk':           self.pk,
      'author':       self.author,
      'text':         self.text,
      'created_date': self.created_date.isoformat(),
      'approved':     self.approved_comment and 'true' or 'false'
    }

  def __str__(self):
    return self.text

class Category(models.Model):
  name            = models.CharField(max_length=100)
  created_date    = models.DateTimeField(default=timezone.now)
  updated_date    = models.DateTimeField(default=timezone.now)
  parent          = models.ForeignKey('weblog.Category', related_name='children', blank=True, null=True)
  depth           = models.IntegerField(default=1)
  order_in_parent = models.IntegerField(default=0)
  family          = models.IntegerField(default=1)

  def attributes(self):
    return {
      'pk':              self.pk,
      'name':            self.name,
      'parent_id':       self.parent_id != None and self.parent_id or 0,
      'depth':           self.depth,
      'order_in_parent': self.order_in_parent,
      'family':          self.family,
    }

  def __str__(self):
    return self.name
