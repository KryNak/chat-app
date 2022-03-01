const sharedMessageBoxStyle = {
    padding: '0.7em',
    borderRadius: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
    width: 'fit-content',
    marginTop: '1em',
    marginBottom: '1em'
}

export const messageBoxRight = {
    backgroundColor: 'rgba(242,242,242,255)',
    alignSelf: 'flex-end',
    marginRight: '1em',
    ...sharedMessageBoxStyle
}

export const messageBoxLeft = {
    alignSelf: 'flex-start',
    marginLeft: '1em',
    backgroundColor: 'rgba(44,107,238,255)',
    color: 'white',
    ...sharedMessageBoxStyle
}