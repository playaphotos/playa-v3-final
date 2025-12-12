const handleShare = async () => {
  // 1. Try Native Share (Mobile)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Event Photos',
        text: 'Check out my photos from the event!',
        url: window.location.href,
      });
      return; // Success, stop here
    } catch (err) {
      console.log('Share canceled or failed', err);
    }
  }

  // 2. Fallback to Clipboard (Desktop)
  try {
    await navigator.clipboard.writeText(window.location.href);
    setToast('Link copied to clipboard!');
    setTimeout(() => setToast(null), 3000);
  } catch (err) {
    setToast('Could not copy link'); // Error feedback
    setTimeout(() => setToast(null), 3000);
  }
};