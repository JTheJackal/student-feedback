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

        // Data bindings from UI
        private string? studentName { get; set; }
        private string? course { get; set; }
        private string? result { get; set; }
        private string? review { get; set; }
        private string? date { get; set; }
        private string? unit1Code { get; set; }
        private string? unit2Code { get; set; }
        private string? status1 { get; set; }
        private string? status2 { get; set; }
        private string? element1Resolved { get; set; }
        private string? element2Resolved { get; set; }
        private string? remedial1Required { get; set; }
        private string? remedial2Required { get; set; }
        private string? remedial1Actions { get; set; }
        private string? remedial2Actions { get; set; }


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

            JSRuntime.InvokeVoidAsync("screenshotGraph");

            /*
            var checkmark       = "⬤";
            var status1Check    = string.Empty;
            var status2Check    = string.Empty;
            var date1 = string.Empty;
            var date2 = string.Empty;

            if(review == "review1")
            {
                status1Check = checkmark;
                date1 = date; 
            }
            else
            {
                status2Check = checkmark;
                date2 = date;
            } 

            // Subscript to the event
            reportState.OnStateChange += StateHasChanged;

            ReportModel report = new ReportModel {
                name = studentName,
                course = course,
                result = result,
                review = review,
                unit1Code = unit1Code,
                date1 = date,
                status1 = status1,
                status1Check = status1Check,
                element1Resolved = element1Resolved,
                remedial1Required = remedial1Required,
                remedial1Actions = remedial1Actions,
                unit2Code = unit2Code,
                date2 = date2,
                status2 = status2,
                status2Check = status2Check,
                element2Resolved = element2Resolved,
                remedial2Required = remedial2Required,
                remedial2Actions = remedial2Actions

            };

            reportState.SetValue(report);

            navManager.NavigateTo("/report");

            reportState.OnStateChange -= StateHasChanged;
            */
        }
    }
}