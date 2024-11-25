from django.shortcuts import render
def home(request):
    return render(request, 'components/home.html')

def events(request):
    return render(request, 'components/events.html')

def contact(request):
    return render(request, 'components/contact.html')

def clubs(request):
    return render(request,'components/clubs.html')

def about(request):
    return render(request,'components/about.html')

