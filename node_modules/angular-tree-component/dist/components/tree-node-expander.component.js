import { Component, Input, ViewEncapsulation } from '@angular/core';
var TreeNodeExpanderComponent = /** @class */ (function () {
    function TreeNodeExpanderComponent() {
    }
    TreeNodeExpanderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'TreeNodeExpander, tree-node-expander',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: "\n    <ng-container *mobxAutorun>\n      <span\n        *ngIf=\"node.hasChildren\"\n        [class.toggle-children-wrapper-expanded]=\"node.isExpanded\"\n        [class.toggle-children-wrapper-collapsed]=\"node.isCollapsed\"\n        class=\"toggle-children-wrapper\"\n        (click)=\"node.mouseAction('expanderClick', $event)\">\n\n        <span class=\"toggle-children\"></span>\n      </span>\n      <span\n        *ngIf=\"!node.hasChildren\"\n        class=\"toggle-children-placeholder\">\n      </span>\n    </ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeNodeExpanderComponent.ctorParameters = function () { return []; };
    TreeNodeExpanderComponent.propDecorators = {
        'node': [{ type: Input },],
    };
    return TreeNodeExpanderComponent;
}());
export { TreeNodeExpanderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxLQUFBLEVBQU8saUJBQUEsRUFBa0IsTUFBTyxlQUFBLENBQWdCO0FBSXBFO0lBQUE7SUFnQ0EsQ0FBQztJQTlCTSxvQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxNQUFNLEVBQUUsRUFBRTtvQkFDVixRQUFRLEVBQUUseWhCQWdCVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsd0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSyx3Q0FBYyxHQUEyQztRQUNoRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtLQUN6QixDQUFDO0lBQ0YsZ0NBQUM7Q0FoQ0QsQUFnQ0MsSUFBQTtTQWhDWSx5QkFBeUIiLCJmaWxlIjoidHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCB7XG4gICBub2RlOiBUcmVlTm9kZTtcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZUV4cGFuZGVyLCB0cmVlLW5vZGUtZXhwYW5kZXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm1vYnhBdXRvcnVuPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJub2RlLmhhc0NoaWxkcmVuXCJcbiAgICAgICAgW2NsYXNzLnRvZ2dsZS1jaGlsZHJlbi13cmFwcGVyLWV4cGFuZGVkXT1cIm5vZGUuaXNFeHBhbmRlZFwiXG4gICAgICAgIFtjbGFzcy50b2dnbGUtY2hpbGRyZW4td3JhcHBlci1jb2xsYXBzZWRdPVwibm9kZS5pc0NvbGxhcHNlZFwiXG4gICAgICAgIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXJcIlxuICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignZXhwYW5kZXJDbGljaycsICRldmVudClcIj5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlblwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwiIW5vZGUuaGFzQ2hpbGRyZW5cIlxuICAgICAgICBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlbi1wbGFjZWhvbGRlclwiPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nbm9kZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==