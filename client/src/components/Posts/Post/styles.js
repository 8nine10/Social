export const useStyles = () => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px',
      position: 'relative',
      width: 200,
      height: 420,
    },
    media: {
      display: 'flex',
      flexDirection: 'column',
    },
    img: {
      height: 200,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      width: 170,
      height: '35px',
      overflow: 'hidden',
      justifyContent: 'space-between',
      fontSize: '20px',
      mb: '10px',
    },
    details: {
      display: 'flex',
      flexDirection: 'row',
      width: 170,
      justifyContent: 'space-between',
      fontSize: '12px',
      height: '35px',
      overflow: 'hidden',
      mb: '20px',
    },
    creator: {
      display: 'flex',
      flexDirection: 'row',
      width: 170,
      justifyContent: 'space-between',
      fontSize: '12px',
      mb: '10px',
    },
    tags: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '10px',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
});