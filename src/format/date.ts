export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date)
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day} ${month} ${year} às ${hours}:${minutes}`
}

const exampleDate = new Date()
console.log(formatDate(exampleDate))
