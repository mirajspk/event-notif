from django.shortcuts import render
from .serializers import EventSerializer
from .models import Event
from rest_framework.generics import ListAPIView # type: ignore

class EventList(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer