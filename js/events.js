document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {

    // plugins: [ 'interaction', 'dayGrid', 'list', 'googleCalendar' ],
    plugins: [ 'interaction', 'dayGrid', 'googleCalendar' ],

    header: {
      left: 'prev,next today',
      center: 'title',
      right: ''
      // right: 'dayGridMonth,listYear'
    },

    displayEventTime: false, // don't show the time column in list view

    // THIS KEY WON'T WORK IN PRODUCTION!!!
    // To make your own Google API key, follow the directions here:
    // http://fullcalendar.io/docs/google_calendar/
    googleCalendarApiKey: 'AIzaSyB39h7lLN8EJXqwaYrE7HF28gKI7WXB3Yw',

    // US Holidays
    events: {
                googleCalendarId: 'oxaisoc@gmail.com'
            },

    eventClick: function(arg) {
      // opens events in a popup window
      window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');

      arg.jsEvent.preventDefault() // don't navigate in main tab
    },

    loading: function(bool) {
      document.getElementById('loading').style.display =
        bool ? 'block' : 'none';
    }

  });

  calendar.render();


  fetch("https://www.eventbriteapi.com/v3/users/me/owned_events/?token=3G3SR4TIW6VDWX32KEFW", {cache: "default"}).then((response)=>{
      if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
          response.status);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
          console.log("eventbrite response", data);
          let events = data.events.slice(2)
              .filter(e=>e.status!=="draft")
              .map((e,i)=>({
              "id":(1000+i).toString(),
              "year": e.start.local.split("-")[0],
              "month": e.start.local.split("-")[1],
              "day": e.start.local.split("-")[2].split("T")[0],
              "end_year": e.end.local.split("-")[0],
              "end_month": e.end.local.split("-")[1],
              "end_day": e.end.local.split("-")[2].split("T")[0],
              "start_time": e.start.local ? e.start.local.split("-")[2].split("T")[1].split(":")[0] + ":" + e.start.local.split("-")[2].split("T")[1].split(":")[1] : "",
              "hour": e.start.local ? e.start.local.split("-")[2].split("T")[1].split(":")[0] : "",
              "minute": e.start.local ? e.start.local.split("-")[2].split("T")[1].split(":")[1] : "",
              "end_time": e.end.local ? e.end.local.split("-")[2].split("T")[1].split(":")[0] + ":" + e.end.local.split("-")[2].split("T")[1].split(":")[1] : "",
              "end_hour": e.end.local ? e.end.local.split("-")[2].split("T")[1].split(":")[0] : "",
              "end_minute": e.end.local ? e.end.local.split("-")[2].split("T")[1].split(":")[1] : "",
              "title": e.name.html,
              "description": e.description.html,
              "media": e.logo ? e.logo.original.url : "",
              "url":e.url
          }))

          let parsedEvents = events.map(e=>({
              media:{url: e.media},
              start_date: {year: e.year, month: e.month, day: e.day, hour: e.hour, minute: e.minute},
              end_date: {year: e.end_year, month: e.end_month, day: e.end_day, hour: e.end_hour, minute: e.end_minute},
              text: {headline: e.title, text: "</br>"+e.start_time+" to "+e.end_time+"</br>"+e.description + "</br><a href='"+e.url+"' rel='noopener noreferrer' target='_blank'>Event page</a></br></br> <a href='"+e.url+"' rel='noopener noreferrer' target='_blank'><button id='eventbrite-widget-modal-trigger-50807309029' class='btn btn-primary' type='button'>Get Tickets</button></a>"},
              url: e.url
          }))
          // parsedEvents.forEach(e=>timeline.add(e));

          let d = new Date();
          let current = {"day":d.getDate(), "month":d.getMonth() + 1, "year": d.getFullYear()};
          let nextDiv = {"year": "month","month": "day","day":""}
          function inFuture(event1,event2,timediv) { // is event1 in future of event2
              if (timediv==="") return 0 //present
              if (parseInt(event1[timediv]) > event2[timediv]) return 1
              else if (parseInt(event1[timediv]) < event2[timediv]) return 0
              else return inFuture(event1, event2, nextDiv[timediv])
          }
          // console.log(events.map((x,i)=>[x,i]))
          let next_events = parsedEvents.filter(e=>inFuture(e.start_date,current,"year")).sort((a, b) => (inFuture(a.start_date,b.start_date,"year")));
          let past_events = parsedEvents.filter(e=>inFuture(current,e.start_date,"year")).sort((a, b) => (-1*(2*inFuture(a.start_date,b.start_date,"year")-1)));
          console.log(past_events)
          if (next_events.length > 0 ) {
              // let next_index = next_events.sort((a, b) => (inFuture(a[0],b[0],"year") ? 1 : 0))[0][1];
              // additionalOptions["start_at_slide"]= 16 + next_index;
          } else {
              // additionalOptions["start_at_slide"]= 16 + events.length - 1; //counting the 16 elements in the json... should load lazily ideally!
          }

          console.log(parsedEvents);
          let event_html_string = (datetime,day,month,year,time,title,image,desc,url) => `<li>
              <a href="`+url+`" target="_blank">
  						<time datetime=` + datetime +`>
  							<span class="day">`+ day +`</span>
  							<span class="month">` + month + `</span>
  							<span class="year">` + year + `</span>
  							<span class="time">` + time + `</span>
  						</time>
  						<img alt=` + title +` src=` + image +` />
  						<div class="info">
  							<h2 class="title">` + title +`</h2>
  							<p class="desc">` + desc +`</p>
              </div>
              </a>
              </li>
                `

          let past_event_htmls = past_events.map(x=>event_html_string(x.start_date.year+"-"+x.start_date.month+"-"+x.start_date.day,x.start_date.day, x.start_date.month, x.start_date.year, x.start_date.hour+":"+x.start_date.minute, x.text.headline, x.media.url, "",x.url))
          let upcoming_event_htmls = next_events.map(x=>event_html_string(x.start_date.year+"-"+x.start_date.month+"-"+x.start_date.day,x.start_date.day, x.start_date.month, x.start_date.year, x.start_date.hour+":"+x.start_date.minute, x.text.headline, x.media.url, "",x.url))
          // console.log(all_event_htmls);
          // let event_html = new DOMParser().parseFromString(html_string, 'text/html')
          if (upcoming_event_htmls.length > 0) document.querySelector('#coming-soon-message').remove()
          upcoming_event_htmls.forEach(html=>{
            document.querySelector('#upcoming-event-list').insertAdjacentHTML('beforeend',html)
          });

          past_event_htmls.forEach(html=>{
            document.querySelector('#past-event-list').insertAdjacentHTML('beforeend',html)
          });


      // $.getJSON("js/events.json", function(data) {
      //     // console.log(data);
      //     // data.feed.entry = data.feed.entry.concat(parsedEvents);
      //     // console.log(data)
      //     // console.log(googleFeedJSONtoTimelineJSON(data))
      //     let eventJSON =  googleFeedJSONtoTimelineJSON(data);
      //     eventJSON["events"] = eventJSON["events"].concat(parsedEvents)
      //     console.log(eventJSON["events"]);
      //     // window.timeline = new TL.Timeline('events-timeline', eventJSON, additionalOptions); //make it a global variable
      // });
      });
  })
});
