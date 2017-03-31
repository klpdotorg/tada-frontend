export function enableNavTreeSingleSelect(singleSelMode)
{
  return {
      type: 'SINGLE_SELECT_MODE',
      value: singleSelMode
    }
}

export function permissionsPageActive(isActive)
{
    return {
        type: 'PERMISSIONS_ACTIVE',
        value: isActive
    }
}

export function boundaryClicked(bound)
{
    return {
        type: 'BOUNDARY_SELECTED',
        boundary: bound
    }
}