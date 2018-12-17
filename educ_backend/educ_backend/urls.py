from django.conf.urls import url 
from django.contrib import admin 
from django.contrib.staticfiles.urls import staticfiles_urlpatterns 
from django.views.generic import TemplateView 

urlpatterns = [
    url(r'^$',
        TemplateView.as_view(template_name='index.html'), name='uHome'
    ), 
    url(r'^admin/', admin.site.urls),
] 

urlpatterns += staticfiles_urlpatterns()