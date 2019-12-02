class RenameImageColumnToGroups < ActiveRecord::Migration[5.0]
  def change
    rename_column :groups, :image, :name
  end
end
