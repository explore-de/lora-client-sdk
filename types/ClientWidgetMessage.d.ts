export type ClientWidgetMessage = ClientTicketWidgetMessage;
export type ClientTicketWidgetMessage = {
    widgetName: 'exploreticket';
    widgetProps: {
        title: string;
        description: string;
    };
};
