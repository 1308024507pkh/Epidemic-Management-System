from django.http import HttpResponse
from TestModel.models import DailyNewBj

def test(request):
    res = ""
    res1 = ""

    lst = DailyNewBj.objects.all()
    
    for var in lst:
        res1 += var.id+" "+str(var.day)+"<br>"
    res = res1
    
    return HttpResponse('<p>'+res+'</p>')
