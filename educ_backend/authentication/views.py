from django.shortcuts import render
from django.template import loader
# Create your views here.

from django.http import HttpResponse
from django.contrib.auth import authenticate, login


# should verify the user is logged in.
def index(request):
    template = loader.get_template('index.html')
    context = {
    }
    return HttpResponse(template.render(context, request))

# function to be called when the user want's to log in.
def logIn(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse("You've been logged in successfully.")
    else:
        return HttpResponse("You haven't been logged in sucessfully.")


# function to be called when the user want's to log out.
def logOut(request):
    return HttpResponse("You're being logged out.")
