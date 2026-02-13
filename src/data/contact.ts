export const CONTACT_DETAILS = {
  headOffice: {
    phone: "07265-252018",
    altPhone: "07265-252251",
    address: "Shri Gajanan Maharaj Sansthan, Shegaon, Dist. Buldhana, Maharashtra - 444203",
    email: "contact@gajananmaharaj.org",
  },
  locations: {
    shegaon: {
      mandir: "07265-252018",
      bhaktaNiwas: "07265-252251",
      anandVihar: "07265-252019",
      visawa: "07265-253018",
    },
  },
  booking: {
    // Primary booking/WhatsApp number — single source for site-wide call/wa.me links
    mobile: "+919217691636",
    whatsapp: "+919217691636",
    helpline: "07265-252018",
  },
  social: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
  }
};

export const WHATSAPP_LINK = `https://wa.me/${CONTACT_DETAILS.booking.whatsapp.replace(/[^0-9]/g, '')}`;
