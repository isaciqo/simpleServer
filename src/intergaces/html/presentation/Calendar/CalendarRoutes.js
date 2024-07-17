module.exports = [
    {
      method: 'post',
      path: '/createCalendar',
      handler: 'calendarController.createCalendar'
    },
    {
      method: 'put',
      path: '/updateCalendar/:id',
      handler: 'calendarController.updateCalendar'
    },
    {
      method: 'put',
      path: '/updateSchedulesCreated/:id',
      handler: 'calendarController.updateSchedulesCreated'
    },
    {
      method: 'put',
      path: '/updateSchedulesJoined/:id',
      handler: 'calendarController.updateSchedulesJoined'
    },
    {
      method: 'get',
      path: '/listCalendar/:createdBy',
      handler: 'calendarController.listCalendar'
    }
    ,
    {
      method: 'get',
      path: '/calendar/:id',
      handler: 'calendarController.getCalendar'
    }
];