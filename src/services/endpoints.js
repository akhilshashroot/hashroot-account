import { API_BASE_URL } from "./hostSetting";

const baseUrl = API_BASE_URL;

export const endpoints = {

  //auth
  hostUrl: baseUrl,
  loginUrl: `${baseUrl}/api/login`,
  viewCountries : `${baseUrl}/api/admin/viewall_countries`,
  viewPayment: `${baseUrl}/api/admin/view_paymentmethods`,
  viewHSN : `${baseUrl}/api/admin/viewall_hsn`,
  updateProfile : `${baseUrl}/api/admin/settings`,

  //Hashroot
  viewHashrootInvoice : `${baseUrl}/api/admin/viewhrtinvoice`,
  addHashrootInvoice : `${baseUrl}/api/admin/add_new_invoice`,

  //Hashroot-P
  viewHashrootpInvoice : `${baseUrl}/api/admin/viewhrtpinvoice`,
  HashrooteditpInvoice : `${baseUrl}/api/admin/edit_invoice`,
  deleteHashrootpInvoice : `${baseUrl}/api/admin/delete_invoice`,
  cloneInvoice:  `${baseUrl}/api/admin/clone_invoice`,
  downloadInvoice : `${baseUrl}/api/admin/pdf/hashrootp_invoice`,
  zipDownload : `${baseUrl}/api/download-all`,

  //Hashroot-S
  viewHashrootsInvoice : `${baseUrl}/api/admin/viewhrtsinvoice`,
  downloadInvoiceS : `${baseUrl}/api/admin/pdf/hashroots_invoice`,

   //Hashroot-SS
  viewHashrootssInvoice: `${baseUrl}/api/admin/viewhrtssinvoice`,
  downloadInvoiceSS : `${baseUrl}/api/admin/pdf/hashrootss_invoice`,

  //Hashroot Bill
  viewHashrootBill : `${baseUrl}/api/admin/viewhrtbills`,

  //Hashroot-P Bill
  viewHashrootpBill : `${baseUrl}/api/admin/viewhrtpbills`,
  addHashrootpBill : `${baseUrl}/api/admin/add_new_bill`,
  deleteHashrootpBill: `${baseUrl}/api/admin/delete_bill`,
  HashrooteditpBill: `${baseUrl}/api/admin/edit_bills`,
  cloneBill: `${baseUrl}/api/admin/clone_bill`,
  
  //Hashroot-S Bill
  viewHashrootsBill : `${baseUrl}/api/admin/viewhrtsbills`,

    
  //Hashroot-SS Bill
  viewHashrootssBill : `${baseUrl}/api/admin/viewhrtssbills`,
};
