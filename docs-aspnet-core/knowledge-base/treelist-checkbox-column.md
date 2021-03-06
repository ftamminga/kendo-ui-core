---
title: Bind Checkboxes in the MVC TreeList
description: An example on how to add a checkbox column to the Kendo UI TreeList which will set the initial checked state based on model values.
type: how-to
page_title: "Add a Checkbox Column in TreeList | UI for ASP.NET Core"
slug: treelist-checkbox-column
tags: treelist, checkbox
ticketid: 1141320
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TreeList for ASP.NET Core</td>
 </tr>
</table>


## Description

How can I add a checkbox column to the TreeList which will set an initial checked or unchecked state of the checkboxes based on the model values?

## Solution

Use the [`template`](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TreeListColumnBuilder#templatesystemstring) method of the TreeList column.

````
columns.Add().Field(e => e.CheckBoxColumnField).Template(
        "#if(CheckBoxColumnField == true){#" +
            Html.Kendo().CheckBox().Name("name#:CheckBoxColumnField#").HtmlAttributes(new { @class = "CheckBoxColumnField" }).Checked(true).ToHtmlString() +
        "#}else{#" +
            Html.Kendo().CheckBox().Name("name#:CheckBoxColumnField#").HtmlAttributes(new { @class = "CheckBoxColumnField" }).ToHtmlString() +
        "#}#"
    );
````
