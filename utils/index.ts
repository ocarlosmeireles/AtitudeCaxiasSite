
export const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|live\/|shorts\/|e\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getThumbnailUrl = (url: string) => {
  const id = getYoutubeId(url);
  if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return url;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const openWhatsApp = (message: string) => {
  const phone = "5521964564689"; 
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
};
