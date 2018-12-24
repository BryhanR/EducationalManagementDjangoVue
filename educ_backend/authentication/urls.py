
from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

urlpatterns = [
    url(r'^users$', views.getUsers, name='getUsers'),
    url(r'^$', views.index, name='login'),
    url(r'^logIn$', views.logIn, name='login'),
    url(r'^logOut$', views.logOut, name='logout'),
]

urlpatterns += staticfiles_urlpatterns()
