from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path

from django.urls import include


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('authentication.urls'), name='vIndex'),
]

urlpatterns += staticfiles_urlpatterns()
