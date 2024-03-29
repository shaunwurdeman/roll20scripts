// Calendar and down day counter for Faerun, Greyhawk, Eberron and Modern Settings
// Created by Kirsty (https://app.roll20.net/users/1165285/kirsty)

// API Commands:
// !cal - for the GM displays the menu in the chat window, for a player displays date, weather, moon and down days

// Red Colour: #7E2D40

var Calendar = Calendar || (function() {
    'use strict';
    
    var version = '3.0.0',
    
    setDefaults = function() {
        state.Calendar = {
            now: {
                version: "3.0.0",
                world: 1,
                ordinal: 1,
                year: 1486,
                down: 0,
                divider: 0,
                weather: "It is a cool but sunny day.",
                time: "OFF",
                startdate: "1,Hammer,1486"
            },
        };
    },
    
    checkDefaults = function() {
        if( ! state.Calendar.now.version){state.Calendar.now.version = "3.0.0"};
        if( ! state.Calendar.now.world){state.Calendar.now.world = 1};
        if( ! state.Calendar.now.ordinal){state.Calendar.now.ordinal = 1};
        if( ! state.Calendar.now.year){state.Calendar.now.year = 1486};
        if( ! state.Calendar.now.down){state.Calendar.now.down = '0'};
        if( ! state.Calendar.now.divider){state.Calendar.now.divider = '0'};
        if( ! state.Calendar.now.weather){state.Calendar.now.weather = "It is a cool but sunny day."};
        if( ! state.Calendar.now.time){state.Calendar.now.time = "OFF"};
        if( ! state.Calendar.now.startdate){state.Calendar.now.startdate = "1,Hammer,1486"};
    },
    
    handleInput = function(msg) {
        var args = msg.content.split(",");
        
        if (msg.type !== "api") {
            return;
        }
        
        if(playerIsGM(msg.playerid)){
            switch(args[0]) {
                case '!cal':
                    calmenu();
                    break;
                case '!setworld':
                    state.Calendar.now.world=args[1];
                    calmenu();
                    break;
                case '!startdate':
                    state.Calendar.now.startdate=args[1]+','+args[2]+','+args[3];
                    calmenu();
                    break;
                case '!setday':
                    switch(Number(state.Calendar.now.world)) {
                        case 1:
                            getFaerunOrdinal(msg);
                            break;
                        case 2:
                            getGreyhawkOrdinal(msg);
                            break;
                        case 3:
                            getModernOrdinal(msg);
                            break;
                        case 4:
                            getEberronOrdinal(msg);
                            break;
                    }
                    weather();
                    calmenu();
                    break;
                case '!setmonth':
                    switch(Number(state.Calendar.now.world)) {
                        case 1:
                            getFaerunOrdinal(msg);
                            break;
                        case 2:
                            getGreyhawkOrdinal(msg);
                            break;
                        case 3:
                            getModernOrdinal(msg);
                            break;
                        case 4:
                            getEberronOrdinal(msg);
                            break;
                    }
                    weather();
                    calmenu();
                    break;
                case '!setyear':
                    state.Calendar.now.year=args[1];
                    calmenu();
                    break;
                case '!setordinal':
                    state.Calendar.now.ordinal=args[1];
                    calmenu();
                    break;
                case '!settime':
                    state.Calendar.now.time=args[1];
                    calmenu();
                    break;
                case '!setdown':
                    var down = Number(args[1]);
                    state.Calendar.now.down = down;
                    getdown(down);
                    calmenu();
                    break;
                case '!setdiv':
                    state.Calendar.now.divider=Number(args[1]);
                    calmenu();
                    break;
                case '!addday':
                    addday(args[1]);
                    weather();
                    calmenu();
                    break;
                case '!weather':
                    if(args[1]=='Roll}'){
                        weather();
                    }else{
                        var string = args[1];
                        for (var i = 2; i < args.length; i++) {
                            string = string + ", " + args[i];
                        }
                        state.Calendar.now.weather = string;
                    }
                    calmenu();
                    break;
                case '!playercal':
                    showcal(msg);
                    break;
                case '!test':
                    checkLeap();
                    break;
            }
        }else if(args[0]=='!cal'){
            showcal(msg);
        }
    },
    
    calmenu = function() {
        var colour = '#7E2D40';
        var divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"'
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ' + colour + '; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ' + colour + '; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid ' + colour + '; margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: ' + colour + '; font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        
        var world = getworld();
        var down = Number(state.Calendar.now.down);
        down = getdown(down);
        var moMenu = getMoMenu();
        var ordinal = state.Calendar.now.ordinal;
        
        var nowdate;
        
        switch(Number(state.Calendar.now.world)) {
            case 1:
                nowdate = getFaerunDate(ordinal).split(',');
                break;
            case 2:
                nowdate = getGreyhawkDate(ordinal).split(',');
                break;
            case 3:
                nowdate = getModernDate(ordinal).split(',');
                break;
            case 4:
                nowdate = getEberronDate(ordinal).split(',');
                break;
        }
        
        var month = nowdate[0];
        var day = nowdate[1];
        
        var moon; 
        
        if (state.Calendar.now.world==1){
            moon = getFaerunMoon();
        }else if(state.Calendar.now.world==2){
            moon = getGreyhawkMoon();
        }else{
            moon = '';
        }
        
        var start = state.Calendar.now.startdate.split(',');
        var startdate = start[0]+getsuffix(start[0])+' '+start[1]+', '+start[2];
        
        sendChat('Calendar', '/w gm <div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Calendar</div>' + //--
            '<div ' + substyle + '>Menu</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<table>' + //--
            '<tr><td>World: </td><td><a ' + astyle1 + '" href="!setworld,?{World?|Faerûn,1|Greyhawk,2|Modern,3|Eberron,4}">' + world + '</a></td></tr>' + //--
            '<tr><td>Start Date: </td><td><a ' + astyle1 + '" href="!startdate,?{Day},?{Month},?{Year}">' + startdate + '</a></td></tr>' + //--
            '<tr><td>Day: </td><td><a ' + astyle1 + '" href="!setday,?{Day?|1},' + month +'">' + day + '</a></td></tr>' + //--
            '<tr><td>Month: </td><td><a ' + astyle1 + '" href="!setmonth,' + day + moMenu + month + '</a></td></tr>' + //--
            '<tr><td>Year: </td><td><a ' + astyle1 + '" href="!setyear,?{Year?|1486}">' + state.Calendar.now.year + '</a></td></tr>' + //--
            //'<tr><td>Ordinal: </td><td><a ' + astyle1 + '" href="!setordinal,?{Ordinal?|1}">' + ordinal + '</a></td></tr>' + //-
            '<tr><td>Time: </td><td><a ' + astyle1 + '" href="!settime,?{Time?|OFF}">' + state.Calendar.now.time + '</a></td></tr>' + //-
            '<tr><td>Down Days: </td><td><a ' + astyle1 + '" href="!setdown,?{Down Days?|0}">' + down + '</a></td></tr>' + //--
            '<tr><td>Down Day<br>Divider: </td><td><a ' + astyle1 + '" href="!setdiv,?{Down Day Divider?|1}">' + state.Calendar.now.divider + '</a></td></tr>' + //--
            '</table>' + //--
            '<br>Weather: ' + state.Calendar.now.weather + //--
            '<br><br>' + moon + //--
            '<br><br><div style="text-align:center;"><a ' + astyle2 + '" href="!addday,?{Days to add?|1}">Advance the Date</a></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!weather,?{Weather|Roll|Edit,?{Edit Weather}}">Change Weather</a></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!playercal">Show to Players</a></div>' + //--
            '</div>'
        );
    },
    
    showcal = function(msg) {
        var nowdate;
        var ordinal = state.Calendar.now.ordinal;
        
        switch(Number(state.Calendar.now.world)) {
            case 1:
                nowdate = getFaerunDate(ordinal).split(',');
                break;
            case 2:
                nowdate = getGreyhawkDate(ordinal).split(',');
                break;
            case 3:
                nowdate = getModernDate(ordinal).split(',');
                break;
            case 4:
                nowdate = getEberronDate(ordinal).split(',');
                break;
        }
        
        var month = nowdate[0];
        var day = nowdate[1];
        var down = state.Calendar.now.down;
            down = getdown(down);
        var suffix = getsuffix(day);
        var world = getworld();
        var divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"'
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        var moon; 
        
        if (state.Calendar.now.world==1){
            moon = getFaerunMoon();
        }else if(state.Calendar.now.world==2){
            moon = getGreyhawkMoon();
        }else{
            moon = '';
        }
        
        var timestr;
        var downstr;
        
        if(state.Calendar.now.time!="OFF"){
            timestr = '<br>The time is: '+state.Calendar.now.time;
        }else{
            timestr = '';
        }
        
        if(down!=0){
            downstr = '<br>Players have ' + down + ' down days.';
        }else{
            downstr = '';
        }
        
        sendChat(msg.who, '<div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Calendar</div>' + //--
            '<div ' + substyle + '>' + world + '</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            day + suffix + ' ' + month + ', ' + state.Calendar.now.year + //--
            timestr + //--
            downstr + //--
            '<br><br>Today\'s weather:<br>' + state.Calendar.now.weather + //--
            '<br><br>' + moon
        );
    },
    
    getworld = function() {
        var num = Number(state.Calendar.now.world);
        var world;
        
        switch(num) {
            case 1:
                world = 'Faerûn';
                break;
            case 2:
                world = 'Greyhawk';
                break;
            case 3:
                world = 'Modern';
                break;
            case 4:
                world = 'Eberron';
                break;
        }
        
        return world;
    },
    
    getdown = function(days) {
        var down = Number(days);
        var div = Number(state.Calendar.now.divider);
        
        if(div!=0){
            down = down/div;
        }
        
        return down;
    },
    
    getMoMenu = function() {
        var world = Number(state.Calendar.now.world);
        var leap = checkLeap();
        var moMenu;
        
        switch(world){
            case 1:
                if(leap==0){
                    moMenu = ',?{Month|Hammer|Midwinter|Alturiak|Ches|Tarsakh|Greengrass|Mirtul|Kythorn|Flamerule|Midsummer|Eleasias|Eleint|Highharvestide|Marpenoth|Uktar|Feast of the Moon|Nightal}">';
                }else{
                    moMenu = ',?{Month|Hammer|Midwinter|Alturiak|Ches|Tarsakh|Greengrass|Mirtul|Kythorn|Flamerule|Midsummer|Sheildmeet|Eleasias|Eleint|Highharvestide|Marpenoth|Uktar|Feast of the Moon|Nightal}">';
                }
                break;
            case 2:
                moMenu = ',?{Month|Needfest|Fire Seek|Readying|Coldeven|Growfest|Planting|Flocktime|Wealsun|Richfest|Reaping|Goodmonth|Harvester|Brewfest|Patchwall|Readyreat|Sunsebb}">';
                break;
            case 3:
                moMenu = ',?{Month|January|February|March|April|May|June|July|August|September|October|November|December}">';
                break;
            case 4:
                moMenu = ',?{Month|Zarantyr|Olarune|Therendor|Eyre|Dravago|Nymm|Lharvion|Barrakas|Rhaan|Sypheros|Aryth|Vult}">';
                break;
        }
        
        return moMenu;
    },
    
    checkLeap = function(){
        
        var leap;
        var remainder;
        var world = Number(state.Calendar.now.world);
        var year = Number(state.Calendar.now.year);
        
        switch(world){
            case 1:
                remainder = year % 4;
                if(remainder==0){
                    leap = 1;
                }else{
                    leap = 0;
                }
                break;
            case 2:
                leap = 0;
                break;
            case 3:
                if(year % 4 != 0){
                    leap = 0;
                }else if(year % 100 != 0){
                    leap = 1;
                }else if(year % 400 != 0){
                    leap = 0;
                }else{
                    leap = 1;
                }
                break;
            case 4:
                leap = 0;
                break;
        }
        
        return leap;
    },
    
    getFaerunDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day>0 && day<=30){
            month="Hammer"; 
            date=day;
        }else if(day==31){
            month="Midwinter"; 
            date='festival';
        }else if(day>31 && day<=61){
            month="Alturiak"; 
            date=day-31;
        }else if(day>61 && day<=91){
            month="Ches";
            date=day-61;
        }else if(day>91 && day<=121){
            month="Tarsakh";
            date=day-91;
        }else if(day==122){
            month="Greengrass";
            date='festival';
        }else if(day>122 && day<=152){
            month="Mirtul";
            date=day-122;
        }else if(day>152 && day<=182){
            month="Kythorn";
            date=day-152;
        }else if(day>182 && day<=212){
            month="Flamerule";
            date=day-182;
        }else if(day==213){
            month="Midsummer";
            date='festival';
        }else if(day==214){
            month="Sheildmeet";
            date='festival';
        }else if(day>214 && day<=244){
            month="Eleasias"
            date=day-214;
        }else if(day>244 && day<=274){
            month="Eleint";
            date=day-244;
        }else if(day==275){
            month="Highharvestide";
            date='festival';
        }else if(day>275 && day<=305){
            month="Marpenoth";
            date=day-275;
        }else if(day>305 && day<=335){
            month="Uktar";
            date=day-305;
        }else if(day==336){
            month="Feast of the Moon";
            date='festival';
        }else if(day>336 && day<=366){
            month="Nightal";
            date=day-336;
        }else{
            month="Hammer";
            date='1';
        }
    
        var array=month+','+String(date);
        return array;    
    },
    
    getGreyhawkDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day>0 && day<=7){
            month="Needfest"; 
            date=day;
        }else if(day>7 && day<=35){
            month="Fire Seek"; 
            date=day-7;
        }else if(day>35 && day<=63){
            month="Readying"; 
            date=day-35;
        }else if(day>63 && day<=91){
            month="Coldeven";
            date=day-63;
        }else if(day>91 && day<=98){
            month="Growfest";
            date=day-91;
        }else if(day>98 && day<=126){
            month="Planting";
            date=day-98;
        }else if(day>126 && day<=154){
            month="Flocktime";
            date=day-126;
        }else if(day>154 && day<=182){
            month="Wealsun";
            date=day-154;
        }else if(day>182 && day<=189){
            month="Richfest";
            date=day-182;
        }else if(day>189 && day<=217){
            month="Reaping";
            date=day-189;
        }else if(day>217 && day<=245){
            month="Goodmonth"
            date=day-217;
        }else if(day>245 && day<=273){
            month="Harvester";
            date=day-245;
        }else if(day>273 && day<=280){
            month="Brewfest";
            date=day-273;
        }else if(day>280 && day<=308){
            month="Patchwall";
            date=day-280;
        }else if(day>308 && day<=336){
            month="Readyreat";
            date=day-308;
        }else if(day>336 && day<=364){
            month="Sunsebb";
            date=day-336;
        }else{
            month="Needfest";
            date='1';
        }
    
        var array=month+','+String(date);
        return array;    
    },
    
    getModernDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day>0 && day<=31){
            month="January"; 
            date=day;
        }else if(day>31 && day<=59){
            month="February"; 
            date=day-31;
        }else if(day>59 && day<=90){
            month="March"; 
            date=day-59;
        }else if(day>90 && day<=120){
            month="April";
            date=day-90;
        }else if(day>120 && day<=151){
            month="May";
            date=day-120;
        }else if(day>151 && day<=181){
            month="June";
            date=day-151;
        }else if(day>181 && day<=212){
            month="July";
            date=day-181;
        }else if(day>212 && day<=243){
            month="August";
            date=day-212;
        }else if(day>243 && day<=273){
            month="September";
            date=day-243;
        }else if(day>273 && day<=304){
            month="October";
            date=day-273;
        }else if(day>304 && day<=334){
            month="November"
            date=day-304;
        }else if(day>334 && day<=365){
            month="December";
            date=day-334;
        }else{
            month="January";
            date='1';
        }
    
        var array=month+','+String(date);
        return array;    
    },
    
    getEberronDate = function(options){
        var day = Number(options);
        var date;
        var month;
        
        if(day<=28){
            month = 'Zarantyr';
            date = day;
        }else if(day<=56){
            month = 'Olarune';
            date = day-28;
        }else if(day<=84){
            month = 'Therendor';
            date = day-56;
        }else if(day<=112){
            month = 'Eyre';
            date = day-84;
        }else if(day<=140){
            month = 'Dravago';
            date = day-112;
        }else if(day<=168){
            month = 'Nymm';
            date = day-140;
        }else if(day<=196){
            month = 'Lharvion';
            date = day-168;
        }else if(day<=224){
            month = 'Rhaan';
            date = day-196;
        }else if(day<=252){
            month = 'Sypheros';
            date = day-224;
        }else if(day<=280){
            month = 'Aryth';
            date = day-252;
        }else if(day<=308){
            month = 'Vult';
            date = day-280;
        }else{
            month = 'Zarantyr';
            date = 1;
        }
        
        var array=month+','+String(date);
        return array;
    },
    
    getFaerunOrdinal = function(options){
        var args = options.content.split(",");
        var date = args[1];
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        if(date == 'festival'){
            date = 1;
        }else{
            date = Number(args[1]);
        }
        
        switch(month) {
            case 'Hammer':
                ordinal = date;
                break;
            case 'Midwinter':
                ordinal = 31;
                break;
            case 'Alturiak':
                ordinal = 31+date;
                break;
            case 'Ches':
                ordinal = 61+date;
                break;
            case 'Tarsakh':
                ordinal = 91+date;
                break;
            case 'Greengrass':
                ordinal = 122;
                break;
            case 'Mirtul':
                ordinal = 122+date;
                break;
            case 'Kythorn':
                ordinal = 152+date;
                break;
            case 'Flamerule':
                ordinal = 182+date;
                break;
            case 'Midsummer':
                ordinal = 213;
                break;
            case 'Sheildmeet':
                ordinal = 214;
                break;
            case 'Eleasias':
                ordinal = 214+date;
                break;
            case 'Eleint':
                ordinal = 244+date;
                break;
            case 'Highharvestide':
                ordinal = 275;
                break;
            case 'Marpenoth':
                ordinal = 275+date;
                break;
            case 'Uktar':
                ordinal = 305+date;
                break;
            case 'Feast of the Moon':
                ordinal = 335+date;
                break;
            case 'Nightal':
                ordinal = 336+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    getGreyhawkOrdinal = function(options){
        var args = options.content.split(",");
        var date = args[1];
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        if(date == 'festival'){
            date = 1;
        }else{
            date = Number(args[1]);
        }
        
        switch(month) {
            case 'Needfest':
                ordinal = date;
                break;
            case 'Fire Seek':
                ordinal = 7+date;
                break;
            case 'Readying':
                ordinal = 35+date;
                break;
            case 'Coldeven':
                ordinal = 63+date;
                break;
            case 'Growfest':
                ordinal = 91+date;
                break;
            case 'Planting':
                ordinal = 98+date;
                break;
            case 'Flocktime':
                ordinal = 126+date;
                break;
            case 'Wealsun':
                ordinal = 154+date;
                break;
            case 'Richfest': 
                ordinal = 182+date;
                break;
            case 'Reaping':
                ordinal = 189+date;
                break;
            case 'Goodmonth':
                ordinal = 217+date;
                break;
            case 'Harvester':
                ordinal = 245+date;
                break;
            case 'Brewfest':
                ordinal = 273+date;
                break;
            case 'Patchwall':
                ordinal = 280+date;
                break;
            case 'Readyreat':
                ordinal = 308+date;
                break;
            case 'Sunsebb':
                ordinal = 336+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    getModernOrdinal = function(options){
        var args = options.content.split(",");
        var date = Number(args[1]);
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        switch(month) {
            case 'January':
                ordinal = date;
                break;
            case 'February':
                ordinal = 31+date;
                break;
            case 'March':
                ordinal = 60+date;
                break;
            case 'April':
                ordinal = 91+date;
                break;
            case 'May':
                ordinal = 121+date;
                break;
            case 'June':
                ordinal = 152+date;
                break;
            case 'July':
                ordinal = 182+date;
                break;
            case 'August':
                ordinal = 213+date;
                break;
            case 'September':
                ordinal = 244+date;
                break;
            case 'October':
                ordinal = 274+date;
                break;
            case 'November':
                ordinal = 305+date;
                break;
            case 'December':
                ordinal = 366+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    getEberronOrdinal = function(options){
        var args = options.content.split(",");
        var date = Number(args[1]);
        var month = args[2];
        var ordinal = state.Calendar.now.ordinal;
        
        switch(month) {
            case 'Zarantyr':
                ordinal = date;
                break;
            case 'Olarune':
                ordinal = 28+date;
                break;
            case 'Therendor':
                ordinal = 56+date;
                break;
            case 'Eyre':
                ordinal = 84+date;
                break;
            case 'Dravago':
                ordinal = 112+date;
                break;
            case 'Nymm':
                ordinal = 140+date;
                break;
            case 'Lharvion':
                ordinal = 168+date;
                break;
            case 'Barrakas':
                ordinal = 196+date;
                break;
            case 'Rhaan':
                ordinal = 224+date;
                break;
            case 'Sypheros':
                ordinal = 252+date;
                break;
            case 'Aryth':
                ordinal = 280+date;
                break;
            case 'Vult':
                ordinal = 308+date;
                break;
            }
        state.Calendar.now.ordinal = ordinal;
    },
    
    addday = function(no){
        var leap = checkLeap();
        var days = Number(no);
        var ordinal = Number(state.Calendar.now.ordinal);
        var world = Number(state.Calendar.now.world);
        var div = state.Calendar.now.div;
        
        if(div!=0){
            state.Calendar.now.down = Number(state.Calendar.now.down)+days;
        }
        
        var newordinal = ordinal+days;
        
        switch(world){
            case 1:
                if(leap==0 && ordinal <= 214 && newordinal >= 214){
                    state.Calendar.now.ordinal = newordinal+1;
                }else{
                    state.Calendar.now.ordinal = newordinal;
                }
                
                if(ordinal>366){
                    ordinal=ordinal-366;
                    state.Calendar.now.year = Number(state.Calendar.now.year)+1;
                }
                break;
            case 2:
                state.Calendar.now.ordinal = newordinal;
                break;
            case 3:
                if(leap==0 && ordinal <= 60 && newordinal >= 60){
                    state.Calendar.now.ordinal = newordinal+1;
                }else{
                    state.Calendar.now.ordinal = newordinal;
                }
            case 4:
                state.Calendar.now.ordinal = newordinal;
                break;
        }
    },
    
    
    
    getsuffix = function(day) {
        
        var date = Number(day)
        var suffix
        
        if (date == 1 || date == 21 ){
            suffix = 'st';
        }else if (date == 2 || date == 22){
            suffix = 'nd';
        }else if (date == 3 || date == 23){
            suffix = 'rd';
        }else{
            suffix = 'th';
        }
        
        return suffix;
    },
    
    weather = function() {
        var roll;
        var temperature;
        var wind;
        var precipitation;
        var season;
        var ordinal = state.Calendar.now.ordinal;
        
        if(ordinal > 349 || ordinal <= 75){
            season = 'Winter'
        }else if(ordinal <= 166){
            season = 'Spring'
        }else if(ordinal <=257 ){
            season = 'Summer'
        }else if(ordinal <=349 ){
            season = 'Fall'
        }
        
        roll = Math.floor(Math.random()*(20-1+1)+1);
        if(roll>=15 && roll<=17){
            switch(season) {
                case 'Winter':
                    temperature = 'It is a bitterly cold winter day. ';
                    break;
                case 'Spring':
                    temperature = 'It is a cold spring day. ';
                    break;
                case 'Summer':
                    temperature = 'It is a cool summer day. ';
                    break;
                case 'Fall':
                    temperature = 'It is a cold fall day. ';
                    break;
            }
        }else if(roll>=18 && roll<=20){
            switch(season) {
                case 'Winter':
                    temperature = 'It is a warm winter day. ';
                    break;
                case 'Spring':
                    temperature = 'It is a hot spring day. ';
                    break;
                case 'Summer':
                    temperature = 'It is a blisteringly hot summer day. ';
                    break;
                case 'Fall':
                    temperature = 'It is a hot fall day. ';
                    break;
            }
        }else{
            switch(season) {
                case 'Winter':
                    temperature = 'It is a cold winter day. ';
                    break;
                case 'Spring':
                    temperature = 'It is a mild spring day. ';
                    break;
                case 'Summer':
                    temperature = 'It is a hot summer day. ';
                    break;
                case 'Fall':
                    temperature = 'It is a mild fall day. ';
                    break;
            }
            
        }
        
        roll = Math.floor(Math.random()*(20-1+1)+1);
        if(roll>=15 && roll<=17){
            wind='There is a light breeze and ';
        }else if(roll>=18 && roll<=20){
            wind='There is a howling wind and ';
        }else{
            wind='The air is still and ';
        }
        
        roll = Math.floor(Math.random()*(20-1+1)+1);
        if(roll>=15 && roll<=17){
            precipitation="Light rain or snow.";
            if(season=='Winter'){
                precipitation = 'snow falls softly on the ground.';
            }else{
                precipitation = 'a light rain falls from the sky.';
            }
        }else if(roll>=18 && roll<=20){
            if(season=='Winter'){
                precipitation = 'snow falls thick and fast from the sky.';
            }else{
                precipitation = 'a torrential rain begins to fall.';
            }
        }else{
            roll = Math.floor(Math.random()*(2-1+1)+1);
            if(roll=1){
                precipitation = 'the sky is overcast.';
            }else{
                precipitation = 'the sky is clear.';
            }
        }
        
        var forecast=temperature+wind+precipitation;
        state.Calendar.now.weather = forecast;
    },
    
    getFaerunMoon = function() {
        var year = state.Calendar.now.year;
        var ordinal = Number(state.Calendar.now.ordinal);
        var moonOrdinal;
        var moon;
        
        var remainder = year/4 - Math.floor(year/4);
        if(remainder==0.25) {
            moonOrdinal=ordinal;
        }else if (remainder==0.5) {
            moonOrdinal=ordinal+365;
        }else if (remainder==0.75) {
            moonOrdinal=ordinal+730;
        }else if (remainder==0) {
            moonOrdinal=ordinal+1095;
        }
        
        var today = ordinal/30.4375 - Math.floor(ordinal/30.4375);
        var tomorrow = (ordinal+1)/30.4375 - Math.floor((ordinal+1)/30.4375);
        var perc = today + ',' + tomorrow + ',' + moonOrdinal;
        
        moon = getMoon(perc);
        
        return moon;
    },
    
    getGreyhawkMoon = function() {
        var ordinal = Number(state.Calendar.now.ordinal);
        var today;
        var tomorrow;
        var LunaOrd = ordinal + 10;
        var CeleneOrd = ordinal + 87;
        
        today = LunaOrd/28 - Math.floor(LunaOrd/28);
        tomorrow = (LunaOrd+1)/28 - Math.floor((LunaOrd+1)/28);
        var perc = today + ',' + tomorrow + ',' + 0;
        var Luna = getMoon(perc);
        
        today = CeleneOrd/91 - Math.floor(CeleneOrd/91);
        tomorrow = (CeleneOrd+1)/91 - Math.floor((CeleneOrd+1)/91);
        perc = today + ',' + tomorrow + ',' + 0;
        var Celene = getMoon(perc)
        
        var moon = 'Luna: '+Luna+'<br>Celene: '+Celene;
        
        return moon;
    },
    
    getMoon = function(perc) {
        var args  = perc.split(',');
        var today = args[0];
        var tomorrow = args[1];
        var moonOrdinal = args[2];
        var moon;
        
        if(today==0 || tomorrow<today || moonOrdinal==1){
            moon = 'Full Moon'
        }else if(today<=0.25 && tomorrow>0.25){
            moon = 'Last Quarter';
        }else if(today<0.25){
            moon = 'Waning Gibbous';
        }else if(today<=0.5 && tomorrow>0.5){
            moon = 'New Moon';
        }else if(today<0.5){
            moon = 'Waning Crescent';
        }else if(today<=0.75 && tomorrow>0.75){
            moon = 'First Quarter';
        }else if(today<0.75){
            moon = 'Waxing Crescent';
        }else{
            moon = 'Waxing Gibbous';
        }
        
        return moon;
    },
    
    checkInstall = function() {
        // if( ! state.Calendar.now.version ) {
            setDefaults();
        // }
        
        if ( state.Calendar.now.version != version ){
            checkDefaults();
        }
    },
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
    };

    return {
        CheckInstall: checkInstall,
        RegisterEventHandlers: registerEventHandlers
    };
    
}());

on("ready",function(){
    'use strict';
    Calendar.CheckInstall();
    Calendar.RegisterEventHandlers();
});