export const categoryColourMatcher = (category) => {
  switch (category) {
    case 'eating_out':
      // return 'rgb(115,205,31)'
      return 'hsl(91,73.7%,46.3%)'
    case 'transport':
      // return 'rgb(0,104,129)'
      return 'hsl(192,100%,25.3%)'
    case 'groceries':
      // return 'rgb(244,148,5)'
      return 'hsl(36,96%,48.8%)'
    case 'shopping':
      // return 'rgb(241,0,122)'
      return 'hsl(330,100%,47.3%)'
    case 'personal_care':
      // return 'rgb(238,10,14)'
      return 'hsl(359,91.9%,48.6%)'
    case 'bills':
      // return 'rgb(0,154,214)'
      return 'hsl(197,100%,42%)'
    case 'finances':
      // return 'rgb(5,177,69)'
      return 'hsl(142,94.5%,35.7%)'
    case 'entertainment':
      // return 'rgb(155,87,255)'
      return 'hsl(264,100%,67.1%)'
    case 'expenses':
      // return 'rgb(137,39,2)'
      return 'hsl(16,97.1%,27.3%)'
    case 'family':
      // return 'rgb(0,56,192)'
      return 'hsl(223,100%,37.6%)'
    case 'general':
      // return 'rgb(101,101,101)'
      return 'hsl(0,0%,39.6%)'
    case 'holidays':
      // return 'rgb(255,108,62)'
      return 'hsl(14,100%,62.2%)'
    default:
      // return 'rgb(66, 66, 66)'
      return 'hsl(0,0%,25.9%)'
  }
}
