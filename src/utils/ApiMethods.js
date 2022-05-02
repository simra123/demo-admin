import Response from './Response';
// defining endpoint of all apis 

// post methods
export const PostMethods = {
    DeleteCategory: (obj) => {
        return Response.PostMethod('/admin/categories/delete-category', obj);
    },
    PostCategory: (obj) => {
        return Response.PostMethod('/admin/categories/create', obj);
    },
    UpdateCategory: (obj) => {
        return Response.PostMethod('/admin/categories/udpate-category', obj);
    },
    UpdateKeyword: (obj) => {
        return Response.PostMethod('/admin/keywords/update-keyword', obj);
    },
    PostKeyword: (obj) => {
        return Response.PostMethod('/admin/keywords/create', obj);
    },
    VendorAssignPositon: (obj) => {
        return Response.PostMethod('/admin/assign-position', obj);
    },
    DeleteKeyword: (obj) => {
        return Response.PostFile('/admin/keywords/delete-keyword', obj);
    },
    DeleteSubscription: (obj) => {
        return Response.PostMethod('/admin/subscriptions/delete-subscription', obj);
    },
    PostSubscription: (obj) => {
        return Response.PostMethod('/admin/subscriptions/create', obj);
    },
    DeleteFAQ: (obj) => {
        return Response.PostMethod('/admin/faqs/delete-faq', obj);
    },
    UpdateSubscription: (obj) => {
        return Response.PostMethod('/admin/subscriptions/update-subscription', obj);
    },
    PostFAQ: (obj) => {
        return Response.PostMethod('/admin/faqs/create', obj);
    },
    UpdateState: (obj) => {
        return Response.PostMethod(`/admin/states/update-state`, obj);
    },
    DeleteState: (obj) => {
        return Response.PostMethod('/admin/states/delete-state', obj);
    },
    PostState: (obj) => {
        return Response.PostMethod('/admin/states/create', obj);
    },
    DeleteSubscribers: (obj) => {
        return Response.PostMethod('/web/delete-subscribe-newsletter', obj);
    },
    DeleteSlider: (obj) => {
        return Response.PostMethod('/admin/slider/delete-slider', obj)
    },
    PostSlider: (obj) => {
        return Response.PostMethod('/admin/slider/create', obj)
    },
    PostImage: (formdata) => {
        return Response.PostMethod('/uploads/sliders', formdata)
    },
    UpdateSlider: (obj) => {
        return Response.PostMethod('/admin/slider/update-slider', obj)
    }
}
// get methods
export const GetMethods = {
    GetAllCategories: () => {
        return Response.GetMethod('/admin/categories/get-all-categories');
    },
    GetSingleCategory: (id) => {
        return Response.GetMethod(`/admin/categories/get-single-category?id=${ id }`);
    },
    GetAllKeywords: () => {
        return Response.GetMethod('/admin/keywords/get-all-keywords');
    },
    GetAllPayments: () => {
        return Response.GetMethod('/admin/payments/get-all-payments');
    },
    GetSingleKeyword: (id) => {
        return Response.GetMethod(`/admin/keywords/get-single-keyword?id=${ id }`);
    },
    GetAllUsers: (pagination) => {
        return Response.GetMethod(`/admin/get-all-vendors?${ pagination }`);
    },
    GetAllSubscriptions: () => {
        return Response.GetMethod(`/admin/subscriptions/get-all-subscriptions`);
    },
    GetSingleSubscription: (id) => {
        return Response.GetMethod(`/admin/subscriptions/get-single-subscription?id=${ id }`);
    },
    GetStripProducts: () => {
        return Response.GetMethod(`/admin/subscriptions/get-stripe-products`);
    },
    GetStripPrices: () => {
        return Response.GetMethod(`/admin/subscriptions/get-stripe-prices`);
    },
    GetAllStates: () => {
        return Response.GetMethod(`/admin/states/get-all-states`);
    },
    GetAllFAQS: () => {
        return Response.GetMethod(`/admin/faqs/get-all-faqs`);
    },
    GetSingleFAQ: (id) => {
        return Response.GetMethod(`/admin/faqs/get-single-faq?id=${ id }`);
    },
    GetSingleState: (id) => {
        return Response.GetMethod(`/admin/states/get-single-state?id=${ id }`);
    },
    GetAllSubscribers: () => {
        return Response.GetMethod('/web/get-subscribe-newsletter');
    },
    GetAllContact: () => {
        return Response.GetMethod('/web/contact-us');
    },
    GetAllContactVendor: () => {
        return Response.GetMethod('/web/contact-vendor');
    },
    GetAllSlider: () => {
        return Response.GetMethod('/admin/slider/get-all-sliders')
    },
    GetSingleSlider: (id) => {
        return Response.GetMethod(`/admin/slider/get-single-slider?id=${ id }`);
    },
}