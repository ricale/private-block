import os
import sys
sys.path.append('/home/ubuntu/myproject/mysite')
os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
