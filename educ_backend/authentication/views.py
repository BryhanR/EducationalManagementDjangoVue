from django.shortcuts import render
from django.template import loader
# Create your views here.

from django.http import HttpResponse
from django.contrib.auth import authenticate, login

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


import json

# should verify the user is logged in.

def getUsers(request):
    users = User.objects.all()
    userList = User.objects.values()
    user = get_user_model()
    user.objects.all()
    return HttpResponse(user)

def index(request):
    template = loader.get_template('index.html')
    context = {
    }
    return HttpResponse(template.render(context, request))

# function to be called when the user want's to log in.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def logIn(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        login(request, user)
        return HttpResponse({'data':{
            'token': 'abcderf'
        }})
    else:
        return HttpResponse("You haven't been logged in sucessfully.")


# function to be called when the user want's to log out.
def logOut(request):
    return HttpResponse("You're being logged out.")
