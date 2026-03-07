import { format, parse } from 'date-fns'

function formatDate(date) {
    const parsedDate = parse(date, `yyyy-MM-dd`, new Date());
    const result = format(parsedDate, "dd/MM/yyyy");
    return result;
};

export { formatDate };