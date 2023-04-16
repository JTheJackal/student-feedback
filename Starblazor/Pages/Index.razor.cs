﻿using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Starblazor.Pages
{
    public partial class Index
    {

        [Inject]
        public IJSRuntime JSRuntime { get; set; }
        
        public async Task CreatePixi()
        {
            await JSRuntime.InvokeVoidAsync("createPixi");
        }


        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                JSRuntime.InvokeVoidAsync("setEnvironment");
                JSRuntime.InvokeVoidAsync("createPixi");
            }

            JSRuntime.InvokeVoidAsync("createBackground");
            JSRuntime.InvokeVoidAsync("createLabels");
            JSRuntime.InvokeVoidAsync("createHeadings");

            JSRuntime.InvokeVoidAsync("createPerimeter");
            JSRuntime.InvokeVoidAsync("initBadges");
        }
    }
}
