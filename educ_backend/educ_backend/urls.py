from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path

from django.urls import include

from authentication import views

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^.*/$', views.index, name='default'),
    url(r'^auth/', include('authentication.urls'), name='vIndex'),
]

urlpatterns += staticfiles_urlpatterns()
