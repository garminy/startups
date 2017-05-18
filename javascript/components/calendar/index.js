var datePicker = {
    currentDate: new Date(),
    generator: function (date) {
        date = date || this.currentDate;
        if (date.constructor != Date) {
            date = new Date(date);
            this.currentDate = date;
        }

        var calendar = document.getElementById('calendar');
        var fragment = document.createDocumentFragment();

        var header = document.createElement('div');
        header.className = 'header';

        var currentMonth = document.createElement('div');
        currentMonth.className = 'current-month';
        currentMonth.innerHTML = this.currentDate.getFullYear() + ' ' + this.getMonthStr();
        header.appendChild(currentMonth);

        var prev = document.createElement('div');
        prev.className = 'prev-month';
        prev.innerHTML = '&lt';
        header.appendChild(prev);

        var next = document.createElement('div');
        next.className = 'next-month';
        next.innerHTML = '&gt';
        header.appendChild(next);

        var nameList = document.createElement('div');
        nameList.className = 'day-names';

        var dayNamesStr = this.setDayNamesStr(calendar.getAttribute('data-locale') || null);
        for (var i = 0; i < 7; i++) {
            var dayName = document.createElement('div');
            dayName.className = 'day-name' + (i == '0' || i == '6' ? ' weekend' : '');
            dayName.innerHTML = dayNamesStr[i];
            nameList.appendChild(dayName);
        }
        header.appendChild(nameList);

        fragment.appendChild(header);
        calendar.appendChild(fragment);
    },

    getMonthStr: function () {
        //获取月分
        var month = this.currentDate.getMonth() + 1;
        return (month <= 9) ? ('0' + month) : month;
    },

    setDayNamesStr: function (locale) {
        //星期显示方式，中文/英文  周日/周一开始
        if (locale == 'zh-CN') {
            return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        } else {
            return ['Su', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        }
    }
};

datePicker.generator(new Date());