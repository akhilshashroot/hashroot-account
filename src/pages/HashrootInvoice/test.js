function calc_cgst(obj){

    //alert(obj.value);

    if(obj instanceof jQuery){

        state_value=obj.val();

    }else{

        state_value=obj.value;

    }

    

    if(state_value ==1){//kerala

        //$("#non_ker_div").css("display","none");

//			$('#cgst_hrt').show('html');

//			$("#cgst_hrt").css("display", "none");

        $("#igst_hrt").css("display", "none");

        $("#cgst_hrt").css("display", "flex"); 

         

        

        amt   = $('#hrt_amt').val();//Final amount

        cgst  = ((amt/118)*18)/2;

//			alert(cgst);
//
        $('#hrt_cgst_9').val(cgst.toFixed(2));//CGST

        $('#hrt_sgst_9').val(cgst.toFixed(2));//SGST

        

        //final

        cgst      = $('#hrt_cgst_9').val();

        sgst      = $('#hrt_sgst_9').val();

        sum       = +cgst + +sgst; //For avoiding concatenation

        amt_wtout = amt - (sum); 

//			alert(sum);

        $('#hrt_cgst_void').val(amt_wtout.toFixed(2));//Amount without CGST & SGST

    }

    else{

        

        amt   = $('#hrt_amt').val();//final amount

        document.getElementById("hrt_iigst").value       = (amt - (amt/1.18)).toFixed(2);//IGST:

        document.getElementById("hrt_gst_void").value    = (amt/1.18).toFixed(2);//Amount without IGST

        $("#cgst_hrt").css("display", "none");

        $("#igst_hrt").css("display", "flex");

        //new code

        $("#non_ker_div").css("display","block");

        $("#cgst_hrt").css("display", "none"); 

        //new code

        

    }

    

    

//		$("#cgst_hrt").css("display", "none");

}	
