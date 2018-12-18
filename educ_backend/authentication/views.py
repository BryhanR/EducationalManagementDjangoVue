from django.shortcuts import render
from django.views.generic import TemplateView
from django.template import loader
# Create your views here.

from django.http import HttpResponse

# should verify the user is logged in.
def index(request):
    #return TemplateView.as_view(template_name='index.html')
    template = loader.get_template('index.html')
    context = {
    }
    return HttpResponse(template.render(context, request))

# function to be called when the user want's to log in.
def logIn(request):
    return HttpResponse("You're being logged in.")


# function to be called when the user want's to log out.
def logOut(request):
    return HttpResponse("You're being logged out.")
