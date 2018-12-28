from django.shortcuts import render
from django.template import loader
# Create your views here.

from django.http import HttpResponse
from django.contrib.auth import authenticate, login

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from rest_framework_jwt.settings import api_settings


# should verify the user is logged in.
#@login_required
def getUsers(request):
    users = User.objects.all()
    userList = User.objects.values()
    user = get_user_model()
    user.objects.all()
    print(str(user))
    return JsonResponse({
        'user': str(request.user),
        'user_Authenticated': request.user.is_authenticated,
        #'session_user_Authenticated': request.session.user.is_authenticated,
        'session': str(request.session)
    })

def index(request):
    template = loader.get_template('index.html')
    context = {
    }
    return HttpResponse(template.render(context, request))

# function to be called when the user want's to log in.
from django.views.decorators.clickjacking import xframe_options_exempt

@xframe_options_exempt
@csrf_exempt
def logIn(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return JsonResponse({
                'token': token,
                'is_authenticated': request.user.is_authenticated,
                'userData': str(request.user)
        })
    else:
        return HttpResponse("You haven't been logged in sucessfully.")


# function to be called when the user want's to log out.
def logOut(request):
    return HttpResponse("You're being logged out.")
