using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Starblazor.Shared;
using Starblazor.Shared.Model;

namespace Starblazor.Pages
{
    public partial class Report
    {
        [Inject]
        public IJSRuntime JSRuntime { get; set; }

        [Inject]
        public ReportState reportState { get; set; }

        private ReportModel report;

        protected override void OnInitialized()
        {
            base.OnInitialized();
            report = reportState.value;

            
        }

        protected override void OnAfterRender(bool firstRender)
        {
            JSRuntime.InvokeVoidAsync("logBadges");
        }
    } 
}