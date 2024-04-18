export const useStyles = () => {
    return {
      paper: {
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
      },
      root: {
        '& .MuiTextField-root': {
            margin: '1px',
        }
      },
      avatar: {
        margin: '1px',
      },
      form: {
        width: '100%',
        marginTop: '3px',
      },
      submit: {
        padding: 1,
        marginBottom: '5px',
      },
      googleButton: {
        padding: 1,
        marginBottom: '5px',
      }
    };
  };
  