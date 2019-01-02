import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "educ_backend.settings")
django.setup()


from django.contrib.auth.models import User


def createBaseUsers():

    users = [
        {
            'username': 'brhn21',
            'email': 'test@mail.com',
            'password': 'admin123'
        }
    ]
    for user in users:
        try:
            _user = User.objects.get(email=user['email'])
            print('removing user')
            print(_user)
            _user.delete()
        finally:
            _user = User.objects.create_user(user['username'], user['email'], user['password'])
            print('user created')
            print(_user)
            _user.save()


createBaseUsers()