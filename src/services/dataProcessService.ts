export const processFetchedBookData = (bookData) => {
  const data = bookData.data;
  let formattedData;

  for (let i = 0; i < data.totalItems; i++) {
    if (
      data.items[i].volumeInfo &&
      data.items[i].volumeInfo.title &&
      data.items[i].volumeInfo.authors &&
      data.items[i].volumeInfo.imageLinks
    ) {
      formattedData = {
        title: data.items[i].volumeInfo.title,
        author: data.items[i].volumeInfo.authors[0],
        img: data.items[i].volumeInfo.imageLinks.thumbnail,
        status: 1,
      };
      break;
    }
  }
  return formattedData;
};
