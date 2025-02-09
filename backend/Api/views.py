import logging
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404 , render , redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer
from .models import Event
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic import CreateView
from rest_framework.parsers import MultiPartParser, FormParser
from .forms import EventForm
from django.contrib import messages

logger = logging.getLogger(__name__)

class EventList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, id=None):
        if id:
            event = get_object_or_404(Event, pk=id)
            serializer = EventSerializer(event, context={'request': request})
            return Response(serializer.data)
        
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        logger.error(f"Validation failed: {serializer.errors}")
        
        return Response({
            'error': 'Bad Request',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        event = get_object_or_404(Event, pk=id)
        serializer = EventSerializer(event, data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        event = get_object_or_404(Event, pk=id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AddEventView(APIView):
    def get(self, request):
        form = EventForm()
        return render(request, "api/add_event.html", {"form": form})

    def post(self, request):
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Event added successfully!")
            return redirect("add_event")  # This most be same as name in url
        else:
            messages.error(request, "Please correct the errors below.")
        return render(request, "api/add_event.html", {"form": form})

