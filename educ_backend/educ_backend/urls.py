from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


from django.urls import include


urlpatterns = [
    url(r'^$', include('authentication.urls'), name='vIndex'),
    url(r'^auth/', include('authentication.urls')),
    url(r'^P<path>/$', include('authentication.urls'), name='vIndex'),
]

urlpatterns += staticfiles_urlpatterns()
