import { deepPurple } from '@mui/material/colors';

export const useStyles = () => {
    return {
      appBar: {
        borderRadius: 5,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        background: 'white',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
      },
      image: {
        marginLeft: '15px',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
      },
      userName: {
        display: 'flex',
        alignItems: 'center',
        color: 'black',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      purple: {
        backgroundColor: deepPurple[500],
      }
    };
  };
  