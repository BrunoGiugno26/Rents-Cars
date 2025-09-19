export const formatPrice = (price:number) =>{
    return new Intl.NumberFormat("us-US",{
        style:"currency",
        currency:"USD"
    }).format(price)
}