export const filterBoundaries = (boundaries, selectedPrimary) => {
  if (selectedPrimary) {
    return boundaries.filter((boundary) => {
      return boundary.entity.type === 'primary' && selectedPrimary;
    });
  }

  return boundaries.filter((boundary) => {
    return boundary.entity.type === 'pre' && !selectedPrimary;
  });
};
