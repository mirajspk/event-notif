# api/forms.py
from django import forms
from .models import Event

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = [
            "title", "location", "date", "host", "type",
            "registration_link", "startTime", "description", "image", "imageTwo"
        ]
        widgets = {
            "date": forms.DateInput(attrs={"type": "date"}),
            "startTime": forms.TextInput(attrs={"placeholder": "e.g., 15:12:00"}),
            "description": forms.Textarea(attrs={"rows": 4}),
        }
