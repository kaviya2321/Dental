export async function uploadImageMock(fileName: string) {
  return {
    imageUrl: `https://mock-storage.example.com/uploads/${encodeURIComponent(fileName)}`
  };
}
