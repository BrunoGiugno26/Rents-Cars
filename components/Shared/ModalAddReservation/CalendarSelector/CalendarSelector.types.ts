export type CalendarSelectorProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    setDateSelected: React.Dispatch<React.SetStateAction<[Date | undefined, Date | undefined]>>
    carPriceDay:string
}