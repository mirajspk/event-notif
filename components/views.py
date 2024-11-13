from django.shortcuts import render
def home(request):
    return render(request, 'components/home.html')

def events(request):
    return render(request, 'components/events.html')

def workshops(request):
    return render(request, 'components/workshops.html')

def clubs(request):
    return render(request,'components/clubs.html')

def news(request):
    return render(request,'components/news.html')

