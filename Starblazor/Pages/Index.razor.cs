using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Starblazor.Shared;
using Starblazor.Shared.Model;

namespace Starblazor.Pages
{
    public partial class Index
    {

        [Inject]
        public IJSRuntime JSRuntime { get; set; }

        [Inject]
        public NavigationManager navManager { get; set; }

        [Inject]
        public ReportState reportState { get; set; }

        
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
            JSRuntime.InvokeVoidAsync("createAptitudes");
            JSRuntime.InvokeVoidAsync("createPerimeter");
            JSRuntime.InvokeVoidAsync("setInteractions");

            JSRuntime.InvokeVoidAsync("initBadges");
            
        }

        private void GenerateReport()
        {

            // Subscript to the event
            reportState.OnStateChange += StateHasChanged;

            ReportModel report = new ReportModel{
                name = "joshua"

                };

            reportState.SetValue(report);

            navManager.NavigateTo("/report");

            reportState.OnStateChange -= StateHasChanged;
        }
    }
}