from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import Transport
from django.core.mail import send_mail
from demo import settings
#from users.models import UserInfo

# Create your views here.
def search1(request):
    UserID = request.GET.get('uid')
    start_p = request.GET.get('start_p')
    end_p = request.GET.get('end_p')
    No = request.GET.get('No')
    Date = request.GET.get('date')
    transport = Transport.objects.filter()
    data = []
    if not start_p and not end_p and not No and not Date:
        for t in transport:
            tmp = t.register_id
            IDList = tmp.split('#')
            for i in  range(len(IDList)):
                if IDList[i] == UserID:
                    datanode = {}
                    datanode['shift_id'] = t.id
                    datanode['No'] = t.No
                    datanode['start_p'] = t.start_p
                    datanode['end_p'] = t.end_p
                    datanode['date'] = t.departure_date.strftime('%Y-%m-%d')
                    datanode['danger_level'] = t.danger_level
                    data.append(datanode)
                    break
    else:
        for t in transport:
            tmp1 = t.start_p
            tmp2 = t.end_p
            tmp3 = t.No
            tmp4 = t.departure_date.strftime('%Y-%m-%d')
            if (not start_p or start_p == tmp1) and (not end_p or end_p == tmp2) and (not No or No == tmp3) and (not Date or Date == tmp4):
                datanode = {}
                datanode['shift_id'] = t.id
                datanode['No'] = t.No
                datanode['start_p'] = t.start_p
                datanode['end_p'] = t.end_p
                datanode['date'] = t.departure_date.strftime('%Y-%m-%d')
                datanode['danger_level'] = t.danger_level
                data.append(datanode)

    res = HttpResponse(json.dumps(data), content_type='application.json')
    return res


def register(request):
    ID = request.GET.get('shift_id')
    UserID = request.GET.get('uid')
    flag = 1
    try:
        t = Transport.objects.get(id=ID)
        tmp = t.register_id
        IDList = tmp.split('#')
        for i in  range(len(IDList)):
            if IDList[i] == UserID:
                flag = 0
                break
        if flag:
            tmp += UserID + '#'
            t.register_id = tmp
            t.save()
    except:
        pass
    data = {}
    res = HttpResponse(json.dumps(data), content_type='application.json')
    return res


def record(request):
    _No = request.GET.get('No')
    _start_p = request.GET.get('start_p')
    _end_p = request.GET.get('end_p')
    _date = request.GET.get('date')
    _danger_level = request.GET.get('danger_level')
    data = {}
    try:
        if _date:
            t = Transport.objects.create(No=_No, start_p=_start_p, end_p=_end_p, departure_date=_date, danger_level=_danger_level)
        else:
            t = Transport.objects.create(No=_No, start_p=_start_p, end_p=_end_p, danger_level=_danger_level)
    except:
        pass

    res = HttpResponse(json.dumps(data), content_type='application.json')
    return res

def shifts(request):
    data = []
    transport = Transport.objects.filter()
    for t in transport:
            datanode = {}
            datanode['shift_id'] = t.id
            datanode['No'] = t.No
            datanode['start_p'] = t.start_p
            datanode['end_p'] = t.end_p
            datanode['date'] = t.departure_date.strftime('%Y-%m-%d')
            datanode['danger_level'] = t.danger_level
            data.append(datanode)
    res = HttpResponse(json.dumps(data), content_type='application.json')
    return res


def mail(request):
    transport = Transport.objects.filter(danger_level=3)
    receiverID = set()
    eList = []
    for t in  transport:
        tmp = t.register_id
        IDList = tmp.split('#')
        for i in IDList:
            if i:
                receiverID.add(i)
    
    '''
    for j in  receiverID:
        try:
            u = UserInfo.objects.get(id=j)
            tmp = u.email
            if tmp:
                eList.append(u.email)
        except:
            pass
    '''
    msg = '服务器运行良好'
    send_mail(
        subject='请注意这是Django邮件测试',
        message=msg,
        from_email=settings.EMAIL_HOST_USER, 
        #recipient_list=eList
        recipient_list = ["3180104412@zju.edu.cn"]               
    )

    data = {}
    res = HttpResponse(json.dumps(data), content_type='application.json')
    return res

def delete(request):
    ID = request.GET.get('shift_id')
    try:
        t = Transport.objects.get(id=ID)
        t.delete()
    except:
        pass
    data = {}
    res = HttpResponse(json.dumps(data), content_type='application.json')
    return res
