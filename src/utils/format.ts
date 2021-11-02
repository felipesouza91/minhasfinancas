export const formatToAmount = (value: string | number) => {
  return Number(value)
    .toLocaleString('pt-Br', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace('R$', 'R$ ');
};
export const formattedDate = (date: string | number) =>
  new Date(date).toLocaleString('pt-Br', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
export const formattedDateNarrow = (date: string | number) =>
  new Date(date).toLocaleString('pt-Br', {
    day: '2-digit',
    month: 'short',
  });

export const formatDateToMountAndYear = (date: Date) => {
  return date.toLocaleDateString('pt-Br', {
    month: 'long',
    year: 'numeric',
  });
};
